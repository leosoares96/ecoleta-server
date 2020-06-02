import express from 'express';

const app = express();
app.use(express.json())

const users = [
    'Leonardo',
    'Teste 01',
    'Teste 02',
    'Daniel'
]

app.get('/users', (request, response) =>{
    const search = String(request.query.search)
    const filteredUsers = users.filter(user => user.includes(search))
    response.json(filteredUsers);
});

app.get('/users', (request, response) =>{
    response.json(users);
});

app.get('/users/:id', (request, response) =>{
    const id = Number(request.params.id);
    response.json(users[id]);
});

app.post('/users', (request, response) =>{
    const data = request.body;

    console.log(data);
    
    const user = {
        name: data.name,
        email: data.email,
    };

    return response.json(user)

})


app.listen(3333);