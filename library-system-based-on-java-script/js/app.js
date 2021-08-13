class library
{
 /** Check if error is already showing **/
 static checkIfErrorAlreadyShow(errorClass)
 {
  let flag = false;
  let wcErrors   = document.querySelectorAll('#wcMessages .wcError'); 
  Array.from(wcErrors).forEach(function(element)
  {
   if(element.classList.contains(errorClass))
   {
    flag = true;
   }
  });
  return flag;
 }

 /** Show error message **/
 static showError(errorType,errorMessage,errorEleID)
 {
  let messages   = document.getElementById('wcMessages'); 
  let messageEle = document.createElement('div');
  messageEle.classList.add('wcError');
  messageEle.classList.add(errorEleID + 'Error');
  messageEle.innerHTML = `<div class="alert alert-${errorType}" role="alert">${errorMessage}</div>`;
  messages.appendChild(messageEle);
 }
 
 /** remove error message **/
 static removeError(errorClass)
 {
  let wcErrors   = document.querySelectorAll('#wcMessages .wcError'); 
  Array.from(wcErrors).forEach(function(element)
  {
   if(element.classList.contains(errorClass))
   {
    element.remove(); 
   }
  });
 }

 /** Form validation **/
 static validation()
 {
  let flag = true;

  /* Book name */
  let txtName = document.getElementById('txtName'); 
  if(txtName.value.length < 5)
  {
   flag = false;
   if(!this.checkIfErrorAlreadyShow('txtNameError'))
   {
    this.showError('danger','Book name lenght less than 5!','txtName');
   }
  }
  else
  {
   this.removeError('txtNameError');
  }

  /* Author name */
  let txtAuthor = document.getElementById('txtAuthor'); 
  if(txtAuthor.value.length < 5)
  {
   flag = false;
   if(!this.checkIfErrorAlreadyShow('txtAuthorError'))
   {
    this.showError('danger','Author name lenght less than 5!','txtAuthor');
   }
  }
  else
  {
   this.removeError('txtAuthorError');
  }

  /* Book type  */
  let radioBookType = ''
  if(document.getElementById('radioBookTypeFiction').checked) 
  {
   radioBookType = 'Fiction';
  }
  if(document.getElementById('radioBookTypeComputerPrograming').checked) 
  {
   radioBookType = 'Programing';
  }
  if(document.getElementById('radioBookTypeCooking').checked) 
  {
   radioBookType = 'Cooking';
  }

  if(radioBookType == '')
  {
   flag = false;
   if(!this.checkIfErrorAlreadyShow('radioBookTypeError'))
   {
    this.showError('danger','Book type is not selected!','radioBookType');
   }
  }
  else
  {
   this.removeError('radioBookTypeError');
  }

  if(flag == true)
  {
   let messages = document.getElementById('wcMessages'); 
   messages.innerText = '';
  }
  return flag;
 }

 /** Add book **/
 static addBook()
 {
  let txtName = document.getElementById('txtName').value; 
  let txtAuthor = document.getElementById('txtAuthor').value; 
  
  /* Book type  */
  let radioBookType = ''
  if(document.getElementById('radioBookTypeFiction').checked) 
  {
   radioBookType = 'Fiction';
  }
  if(document.getElementById('radioBookTypeComputerPrograming').checked) 
  {
   radioBookType = 'Programing';
  }
  if(document.getElementById('radioBookTypeCooking').checked) 
  {
   radioBookType = 'Cooking';
  }

  let book = {'Name':txtName, 'Author':txtAuthor, 'Type':radioBookType};
  let books = JSON.parse(localStorage.getItem('books'));
  
  if(books == null)
  {
   books = Array();
   books.push(book);
  }
  else
  {
   books.push(book);
  }
  localStorage.setItem('books', JSON.stringify(books));

  this.showBooks();
  this.resetAddBookForm()
 }

 /** Show books **/
 static showBooks()
 {
  let books = JSON.parse(localStorage.getItem('books'));
  if(books != null)
  {
   let records = '';
   books.forEach(function(element,key){
    let record = `<tr data-id="${key}">
                   <th scope="row">${key+1}</th>
                   <td>${element.Name}</td>
                   <td>${element.Author}</td>
                   <td>${element.Type}</td>
                   <td><a href="#" id="${key}" class="wcDeleteBook">Delete</a></td>
                  </tr>`; 
    records += record; 
   });
   let tbodyBooksRecords = document.getElementById('tbodyBooksRecords');
   tbodyBooksRecords.innerHTML = records;
  }
 }

 static resetAddBookForm()
 {
  let formAddBook = document.getElementById('formAddBook');
  formAddBook.reset();
 }

 static deleteBook(e)
 {
  e.preventDefault();
  let books = JSON.parse(localStorage.getItem('books'));
  books.splice(e.target.id, 1);
  localStorage.setItem('books', JSON.stringify(books));
  library.showBooks();
 }
}

/** Show all books **/
library.showBooks();

/** Add book button click function **/
const btnAddBook = document.getElementById('btnAddBook');
btnAddBook.addEventListener('click',function(e){
 e.preventDefault();
 if(library.validation())
 {
  library.addBook();
 }
});

/** Delete book button click function **/
// const btnDeleteBooks = document.querySelectorAll('.wcDeleteBook');
// console.log(btnDeleteBooks);
// for (var i = 0; i < btnDeleteBooks.length; i++) 
// {
//  btnDeleteBooks[i].addEventListener('click', library.deleteBook);
// }

document.addEventListener('click',function(e)
{
 if(e.target && e.target.classList.contains('wcDeleteBook') )
 {
  library.deleteBook(e);
 }
});
