console.log('long polling');

const subscribe = async (lastData) => {
  try {
    const res = await fetch('/subscribe' + '?data=' + lastData, { method: 'GET' });
    const data = await res.json();
    updateData(data.message);
    // recursively persist request for getting updated data
    if (res.status !== 200) {
      // retry after a second
      await new Promise((res) => setTimeout(res, 1000));
    }
    await subscribe(data.message);
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

subscribe('');
