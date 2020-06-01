import express from 'express';

const app = express();

app.get('/users', (request, response) =>{
    console.log('Listagem de usuarios');

    
    response.json([
        'Leonardo',
        'Teste 01',
        'Teste 02',
        'Daniel',
        'teste'
    ]);
})

app.listen(3333);