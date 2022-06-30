
![Jietu20220630-112451-HD](https://user-images.githubusercontent.com/1744713/176586889-c94e0a0d-4007-453c-bdb8-cf9e322697b2.gif)

## Useage

```
npm i antd-resizable-table
yarn add antd-resizable-table
```

```js
const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 200,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
  },
  {
    title: 'Action',
    key: 'action',
  },
]

const dataSource = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  },
]

const App = () => {
  return <ResizableTable columns={columns} dataSource={dataSource} />
}
```
