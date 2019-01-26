const items = document.getElementById('items');
const inputButton = document.getElementById('inputButton');

const getItems = () => {
  fetch('http://localhost:3000/getTodos')
    .then(result => result.json())
    .then((data) => {
      console.log('databack', data);
      data.forEach(item => {
        const newItem = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        newItem.setAttribute('id', item._id);
        deleteButton.addEventListener('click', deleteItem);
        deleteButton.setAttribute('id', item._id);
        newItem.innerHTML = item.task;
        items.appendChild(newItem);
        newItem.appendChild(deleteButton);
      });
    })
    .catch((err) => console.log('err from getTodos', err))
};

window.onload = getItems();

const addItem = () => {
  const inputVal = document.getElementById('todoInput');
  //MAKE FETCH REQUEST
  fetch('http://localhost:3000/submit', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({text: inputVal.value}), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data)
        const newItem = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        newItem.setAttribute('id', data._id);
        deleteButton.addEventListener('click', deleteItem);
        deleteButton.setAttribute('id', data._id);
        newItem.innerHTML = data.task;
        items.appendChild(newItem);
        newItem.appendChild(deleteButton);
      })
      .catch(error => console.error('Error:', error));


  inputVal.value = '';
};

const deleteItem = e => {
  console.log(e.target.parentNode);
  fetch('http://localhost:3000/remove', {
    method: 'DELETE', // or 'PUT'
    body: JSON.stringify({ _id: e.target.id }), // data can be `string` or {object}!
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data)
      e.target.parentNode.remove();
    })
    .catch(error => console.error('Error:', error));
};

inputButton.addEventListener('click', addItem);




//Submit Handler







