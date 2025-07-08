// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker terdaftar!', reg))
    .catch(err => console.log('Service Worker gagal:', err));
}

// Daftar buku dummy (bisa di-fetch dari JSON juga)
const books = [
  { title: "Buku 1", author: "Penulis A" },
  { title: "Buku 2", author: "Penulis B" },
  { title: "Buku 3", author: "Penulis C" }
];

// Tampilkan buku di halaman
const bookList = document.getElementById('book-list');
books.forEach(book => {
  const div = document.createElement('div');
  div.className = 'book';
  div.innerHTML = <h3>${book.title}</h3><p>${book.author}</p>;
  bookList.appendChild(div);
});

// Contoh penggunaan IndexedDB (opsional nilai tambahan)
if ('indexedDB' in window) {
  let request = indexedDB.open('BookDB', 1);
  request.onupgradeneeded = e => {
    let db = e.target.result;
    db.createObjectStore('books', { keyPath: 'title' });
  };
  request.onsuccess = e => {
    let db = e.target.result;
    let tx = db.transaction('books', 'readwrite');
    let store = tx.objectStore('books');
    books.forEach(book => store.put(book));
  };
}