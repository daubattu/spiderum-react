export default function(token) {
  if(localStorage.getItem('token')) return true;
  return false;
}
