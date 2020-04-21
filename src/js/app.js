const data = [
  { name: 'IPhone XR', cost: '60000' },
  { name: 'Samsung Galaxy S10+', cost: 80000 },
  { name: 'Huawei View', cost: 50000 },
];

const refreshForm = () => {
  const nameField = document.getElementById('name');
  const costField = document.getElementById('cost');
  const saveButton = document.getElementById('btnSave');

  nameField.value = '';
  costField.value = '';
  saveButton.value = 'Save';
  saveButton.removeAttribute('data-update');
};

const updateForm = (id) => {
  const nameField = document.getElementById('name');
  const costField = document.getElementById('cost');
  const saveButton = document.getElementById('btnSave');

  nameField.value = data[id].name;
  costField.value = data[id].cost;
  saveButton.value = 'Сохранить';
  saveButton.setAttribute('data-update', id);
};

const updateTable = () => {
  const dataTable = document.getElementById('table');
  const tableHead = document.getElementById('table-head');
  const tbody = document.createElement('tbody');

  while (dataTable.firstChild) {
    dataTable.removeChild(dataTable.firstChild);
  }

  dataTable.appendChild(tableHead);

  for (let i = 0; i < data.length; i += 1) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const btnDelete = document.createElement('input');
    const btnEdit = document.createElement('input');

    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('value', 'X');
    btnDelete.setAttribute('class', `btn btnDelete delete_${i}`);
    btnDelete.setAttribute('id', i);

    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('value', '✍');
    btnEdit.setAttribute('class', `btn btnEdit edit_${i}`);
    btnEdit.setAttribute('id', i);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML = data[i].name;
    td2.innerHTML = data[i].cost;
    td3.appendChild(btnEdit);
    td3.appendChild(btnDelete);


    btnDelete.onclick = (function () {
      const deleteId = this.getAttribute('id');
      data.splice(deleteId, 1);
      updateTable();
      refreshForm();
    });

    document.getElementById('createB').onclick = function () {
      document.getElementById('form').style.display = 'flex';
    };

    btnEdit.addEventListener('click', function () {
      const editId = this.getAttribute('id');
      document.getElementById('form').style.display = 'flex';
      updateForm(editId);
    }, false);

    tbody.appendChild(tr);
  }
  dataTable.appendChild(tbody);
};

const saveData = () => {
  const newName = document.getElementById('name').value;
  const newCost = document.getElementById('cost').value;
  const dataToAdd = {
    name: newName,
    cost: newCost,
  };

  data.push(dataToAdd);
  updateTable();
};

const updateData = (id) => {
  const upName = document.getElementById('name').value;
  const upCost = document.getElementById('cost').value;

  data[id].name = upName;
  data[id].cost = upCost;
  updateTable();
};

const init = () => {
  updateTable();

  const btnSave = document.getElementById('btnSave');
  const btnCancel = document.getElementById('btnCancel');

  const nameField = document.getElementById('name');
  const costField = document.getElementById('cost');

  const nameInvalid = document.getElementById('name_invalid');
  const costInvalid = document.getElementById('cost_invalid');

  btnSave.onclick = function () {
    nameInvalid.innerHTML = '';
    costInvalid.innerHTML = '';

    if (nameField.checkValidity() && costField.checkValidity()) {
      if (btnSave.getAttribute('data-update')) {
        updateData(btnSave.getAttribute('data-update'));
      } else {
        saveData();
      }
      document.getElementById('form').style.display = 'none';
      refreshForm();
    } else {
      if (!nameField.checkValidity()) {
        nameInvalid.innerHTML = 'Укажите название товара!';
      }
      if (!costField.checkValidity()) {
        costInvalid.innerHTML = 'Укажите цену товара числом больше нуля!';
      }
    }
  };

  btnCancel.onclick = function () {
    document.getElementById('form').style.display = 'none';
    nameField.value = '';
    costField.value = '';
    nameInvalid.innerHTML = '';
    costInvalid.innerHTML = '';
  };
};

init();
