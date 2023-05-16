const jwt = require('jsonwebtoken');

const JWT_SECRET = 'code!123';

const token = jwt.sign({ data: { kelas: 'code' } }, JWT_SECRET, { expiresIn: '1h' });

console.log(token);

jwt.sign({ data: { kelas: 'code' } }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
  console.log(token);
});

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImtlbGFzIjoiY29kZSJ9LCJpYXQiOjE2ODQyMTgxMTEsImV4cCI6MTY4NDIyMTcxMX0.ZLbKkwPpBH6gJB5qWWg2ffOULO7SKJrV604EaR5wIOo';
jwt.verify(token1, JWT_SECRET, (err, decoded) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(decoded);
});

try {
  const decoded = jwt.verify(token1, JWT_SECRET);
  console.log(decoded);
} catch (error) {
  console.log(error.message);
}
