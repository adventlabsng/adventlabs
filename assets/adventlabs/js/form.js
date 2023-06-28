const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.onload = () => {
    if (x.status === 200) {
      alert('We have received you data and we will get in touch');
    }
  };
  x.open(options.method, options.url);
  x.send(JSON.stringify(options.data));
};

let loginForm = document.getElementById('getInTouchForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = document.getElementById('name');
  let company = document.getElementById('company');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let description = document.getElementById('description');

  if (
    name.value === '' ||
    email.value === '' ||
    phone.value === '' ||
    description.value === '' ||
    company.value === ''
  ) {
    alert('Ensure you input a value in all fields!');
  } else {
    const payload = {
      text: `${name.value} from ${company.value} left a message`,
      blocks: [
        {
          type: 'section',
          block_id: 'section789',
          fields: [
            {
              type: 'mrkdwn',
              text: `${name.value} from ${company.value}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${description.value}`,
          },
        },
        {
          type: 'section',
          block_id: 'section567',
          text: {
            type: 'mrkdwn',
            text: `${phone.value} \n ${email.value}`,
          },
        },
      ],
    };
    doCORSRequest({
      method: 'POST',
      url: 'https://hooks.slack.com/services/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',
      data: payload,
    });

    name.value = '';
    company.value = '';
    email.value = '';
    phone.value = '';
    description.value = '';
  }
});
