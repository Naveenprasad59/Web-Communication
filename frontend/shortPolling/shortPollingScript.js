console.log('short polling');

const getData = async () => {
  try {
    const res = await fetch('/getData', { method: 'GET' });
    const data = await res.json();
    return data.message;
  } catch (err) {
    console.error(err);
  }
};

const updateData = (data) => {
  document.getElementById('dataTag').textContent = data;
};

const form = document.getElementById('updateForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputElement = document.getElementById('userInput');
  const inputValue = inputElement.value;

  await fetch('/updateData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput: inputValue }),
  });

  form.reset();
  updateData(inputValue);
});

setInterval(() => {
  getData().then(updateData);
}, 5000);
