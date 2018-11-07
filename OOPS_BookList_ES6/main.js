class Book {
    constructor(title,author,serial) {
        this.title = title;
        this.author = author;
        this.serial = serial;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        const row = document.getElementById("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.serial}</td>
            <td><a href="" id="del" class= "btn btn-danger">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message,className) {
        const div = document.createElement('div');

        // add class name

        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        // get form

        const form = document.querySelector('#book-form');

        //insert alert

        container.insertBefore(div, form);

        // timeout after 2 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.getElementById('del')) {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('serial').value = '';
    }

}

//event listening

document.getElementById('book-form').addEventListener('submit',function(e){
        //get form values

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const serial = document.getElementById('serial').value;

        // instantiate Book
        const book = new Book(title,author,serial);

        //instantiate UI
        const ui = new UI();

        //validate

        if (title === '' || author === '' || serial === '') {
            //error alert
            ui.showAlert('please fill all fields','text-danger');
        } else {

            //add book to list
            ui.addBookToList(book);

            //show susccess
            ui.showAlert('Book Added', 'text-success');

            //clear fields
            ui.clearFields();
        }
        e.preventDefault();
    })

    //event listening for delete
    document.getElementById('book-list').addEventListener('click',
    function(e) {
        
        //instantiate UL
        const ui = new UI();

        //delete book
        ui.deleteBook(e.target);

        //show message
        ui.showAlert('Book Removed', 'text-success');
        e.preventDefault();
    });