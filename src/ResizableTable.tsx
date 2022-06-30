import React from 'react'
import { Table } from 'antd'
import { Resizable } from 'react-resizable'
import type { ResizableProps, ResizeCallbackData } from 'react-resizable'
import type { TableProps, ColumnsType } from 'antd/lib/table/Table'
import type { ColumnGroupType, ColumnType } from 'antd/lib/table/interface'
import './style.css'

const ResizeableTitle: React.FC<ResizableProps> = ({ onResize, width, ...restProps }) => {
  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
      minConstraints={[80, 80]}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export class ResizableTable<T> extends React.Component<TableProps<T>> {
  public state = {
    columns: [] as ColumnsType<T>,
  }

  public componentDidMount() {
    this.setState({
      columns: this.props.columns,
    })
  }

  public components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  public handleResize =
    (index: string) =>
    (_e: any, { size }: ResizeCallbackData) => {
      this.setState(({ columns }: { columns: ColumnsType }) => {
        const nextColumns = [...columns]
        const indexArr = index.split('-')

        const parentColumn = nextColumns[Number(indexArr[0])] as ColumnGroupType<any>
        if (indexArr[1]) {
          const childrenColumn = parentColumn.children[Number(indexArr[1])]
          childrenColumn.width = size.width
        }
        parentColumn.width = size.width

        return { columns: nextColumns }
      })
    }

  public columnChildrenHandler = (children: ColumnsType<any>, parentIndex: number): ColumnsType<any> =>
    children.map((child, index) => ({
      ...child,
      onHeaderCell: (column: ColumnGroupType<any> | ColumnType<any>) =>
        ({
          width: column.width,
          onResize: this.handleResize(`${parentIndex}-${index}`),
        } as React.HTMLAttributes<HTMLElement>),
    }))

  public render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      children: (col as ColumnGroupType<any>).children
        ? this.columnChildrenHandler((col as ColumnGroupType<any>).children, index)
        : [],
      onHeaderCell: (column: ColumnGroupType<any> | ColumnType<any>) =>
        ({
          width: column.width,
          onResize: this.handleResize(String(index)),
        } as React.HTMLAttributes<HTMLElement>),
    }))

    return <Table {...this.props} components={this.components} columns={columns} />
  }
}
