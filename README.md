# add import
import DataTableTest from 'newdtpackage/src/Components/DataTable/DataTableTest';


## add this component and import it

      <DataTableTest
        columns={columns}
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />


## same object is need in columns

const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        id: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
        id: 'age',
      },
      {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
      },{
        Header: 'new',
        accessor: 'email',
        id: 'age',
      },
    ],
    []
  );


### data to show in table

  const data1 = [
      { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', age: 22, email: 'jane@example.com' },
      { id: 3, name: 'Alice Smith', age: 34, email: 'alice@example.com' },
      { id: 4, name: 'Bob Johnson', age: 45, email: 'bob@example.com' },
      // Add more rows as needed
  ]
  const [data,setData] = useState(data1)


### function to handle button edit, View and Delete 
 const handleView = (row) => {
    alert(`Viewing row: ${JSON.stringify(row)}`);
  };

  const handleEdit = (row) => {
    alert(`Editing row: ${JSON.stringify(row)}`);
  };

  const handleDelete = (row) => {
    alert(`Deleting row: ${JSON.stringify(row)}`);
  };
