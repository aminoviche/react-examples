import React from 'react';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState  } from 'react';
import useFetch from '../../hooks/useFetch';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid';


const handleEdit = (id) => {
  console.log("Edit row", id);
};

const handleDelete = (id) => {
  console.log("Delete row", id);
};

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title', headerName: 'Title', width: 150, editable: false,
  },
  {
    field: 'description', headerName: 'Description', width: 500, editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 50,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    sortable: false,
    width: 150
  },
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 100,
    renderCell: (params) => <img width={50} src={params.value} />
  },
  {
    field: 'actions1',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
    ),
  },
  {
    field: 'actions2',
    type: 'actions',
    headerName: 'Actions',
    getActions: (params) => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEdit(params.id)} />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.id)} />,
    ],
  },
];
export default function ProductList() {
  const { data: productList} = useFetch('https://fakestoreapi.com/products');
  const { data :categories } = useFetch('https://fakestoreapi.com/products/categories');
  const [productListFiltered, setProductListFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

    

    useEffect(() => {
      setProductListFiltered(productList);
    }, [productList]);
  

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = document.querySelector('#search').value.toLowerCase();

    let searchedProducts = productList;

    if(selectedCategory){
      searchedProducts= searchedProducts.filter(
        (product) => product.category.toLowerCase().includes(selectedCategory));
    }


    if(searchValue){
      searchedProducts= searchedProducts.filter(
        (product) => product.title.toLowerCase().includes(searchValue) ||
                    product.description.toLowerCase().includes(searchValue));                    
    }

    setProductListFiltered(searchedProducts);
  }



  return (
    <>
    <h1>Product List </h1>
    <h1>Search Form</h1>
    <form>
        <label for="search">Search:</label>
        <input type="text" id="search" name="query" placeholder="Type to search..." />
        <button type="submit"  onClick={handleSearch}>Search</button>
        <button type="reset" onClick={(e)=>{
           
            setSelectedCategory(null);
            }}>Reset</button>
    </form>
    <div>
        {categories.map((cat,key)=>(
          <button className={ 'btn ' + (selectedCategory === cat ? 'btn-dark' : 'btn-secondary')}
          key={key}
          onClick={(e)=>{
            e.preventDefault();
            setSelectedCategory(cat);
            }}>
            <span className="badge badge-pill bg-dark">{cat}</span>
          </button>
        ))
        }
      </div>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={productListFiltered}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        //checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}

