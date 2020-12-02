import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'OS for BTech 2nd year',
    media: '/static/images/products/product_1.png',
    title: 'Operating Systems',
    teacherName:'Mohak Gupta',
    nextClassDate:'10/12/2020'
    
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'OOPS for BTech 3rd year',
    media: '/static/images/products/product_2.png',
    title: 'OOPS',
    teacherName:'Mohak Gupta',
    nextClassDate:'10/12/2020'
    
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'Computer Networks',
    media: '/static/images/products/product_3.png',
    title: 'Computer Networks',
    teacherName:'Mohak Gupta',
    nextClassDate:'10/12/2020'
    
  },
  
];
