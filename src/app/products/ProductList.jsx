import React from 'react';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState  } from 'react';
import useFetch from '../../hooks/useFetch';

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
];
export default function ProductList() {
  const { data: productList} = useFetch('https://fakestoreapi.com/products');
  const { data :categories } = useFetch('https://fakestoreapi.com/products/categories');
  const [productListFiltred, setProductListFiltred] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

    

    useEffect(() => {
      setProductListFiltred(productList);
    }, [productList]);
  

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = document.querySelector('#search').value.toLowerCase();

    let searchedProducts = productList;

    if(selectedCategory){
      searchedProducts= searchedProducts.filter(
        (product)=> product.category.toLowerCase().includes(selectedCategory));
    }


    if(searchValue){
      searchedProducts= searchedProducts.filter(
        (product)=> product.title.toLowerCase().includes(searchValue) || 
                    product.description.toLowerCase().includes(searchValue));                    
    }

    setProductListFiltred(searchedProducts);
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
        rows={productListFiltred}
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

