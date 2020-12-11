import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'OS for BTech 2nd year OS for BTech 2nd yearOS for BTech 2nd yearOS for BTech 2nd',
    media: '/static/images/products/product_1.png',
    title: 'OPERATING SYSTEMS',
    type:'Exam',
    links:["http://localhost:5000/download","http://localhost:5000/download","http://localhost:5000/download"]
    
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'OOPS for BTech 3rd year',
    media: '/static/images/products/product_2.png',
    title: 'COMPUTER NETWORKS',
    type:'Quiz',
    links:["http://localhost:5000/download/file.pdf","http://localhost:5000/download","http://localhost:5000/download"]
  },
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'OS for BTech 2nd year',
    media: '/static/images/products/product_1.png',
    title: 'OPERATING SYSTEMS',
    type:'Assignment',
    links:["http://localhost:5000/download","http://localhost:5000/download","http://localhost:5000/download"]
    
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'OOPS for BTech 3rd year',
    media: '/static/images/products/product_2.png',
    title: 'COMPUTER NETWORKS',
    type:'Exam',
    links:["http://localhost:5000/download","http://localhost:5000/download","http://localhost:5000/download"]
  },
  
];
