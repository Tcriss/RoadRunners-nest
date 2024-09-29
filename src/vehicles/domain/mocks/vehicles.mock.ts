import { ObjectId } from 'mongodb';

import { Vehicle } from '../entities';

export const vehicleMocks: Vehicle[] = [
  {
    _id: new ObjectId(),
    brand: 'Toyota',
    condition: 'Nuevo',
    fuel: 'Gasolina',
    images: [],
    location: 'Santiago',
    model: 'Corolla',
    owner: '651022f51234ab567c890def',
    portrait: {
      id: 'portrait1',
      url: 'image-url-1'
    },
    price: 280000,
    seller: {
      _id: new ObjectId(),
      email: 'seller1@email.com',
      name: 'Seller One',
      phone: '+1 809-111-1111',
      picture: 'picture-url-1',
    },
    type: 'Jeepeta',
    year: '2023'
  },
  {
    _id: new ObjectId(),
    brand: 'Honda',
    condition: 'Usad0',
    fuel: 'Diesel',
    images: [],
    location: 'Santiago',
    model: 'Civic',
    owner: '651022f51234ab567c890abc',
    portrait: {
      id: 'portrait2',
      url: 'image-url-2'
    },
    price: 190000,
    seller: {
      _id: new ObjectId(),
      email: 'seller2@email.com',
      name: 'Seller Two',
      phone: '+1 809-222-2222',
      picture: 'picture-url-2',
    },
    type: 'Sedán',
    year: '2021'
  },
  {
    _id: new ObjectId(),
    brand: 'Ford',
    condition: 'Nuevo',
    fuel: 'Electrico',
    images: [],
    location: 'Santo Domingo',
    model: 'Mustang',
    owner: '651022f51234ab567c890123',
    portrait: {
      id: 'portrait3',
      url: 'image-url-3'
    },
    price: 350000,
    seller: {
      _id: new ObjectId(),
      email: 'seller3@email.com',
      name: 'Seller Three',
      phone: '+1 809-333-3333',
      picture: 'picture-url-3',
    },
    type: 'Sports',
    year: '2024'
  },
  {
    _id: new ObjectId(),
    brand: 'Chevrolet',
    condition: 'Usado',
    fuel: 'Gasoline',
    images: [],
    location: 'Puerto Plata',
    model: 'Camaro',
    owner: '651022f51234ab567c890def',
    portrait: {
      id: 'portrait4',
      url: 'image-url-4'
    },
    price: 220000,
    seller: {
      _id: new ObjectId(),
      email: 'seller4@email.com',
      name: 'Seller Four',
      phone: '+1 809-444-4444',
      picture: 'picture-url-4',
    },
    type: 'Convertible',
    year: '2022'
  }
];
