export default function(title, lengthStr) {
  if(title.length > lengthStr) {
    let i = lengthStr;
    while(title[i] !== ' '){
      i--;
    }
    title = title.slice(0, i) + '...';
  }
  return title.charAt(0).toUpperCase() + title.slice(1);
}
