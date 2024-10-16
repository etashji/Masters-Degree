import * as authors from "./authors.js";
import * as books from "./books.js";

// Authors getAuthorsbyId()
try {
    console.log(await authors.getAuthorById());
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById(1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById(""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById(" "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById("blah"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById(-1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById(1001));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById());
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
} catch(e) {
    console.log(e);
}

//Authors searchAuthorsByAge

try {
    console.log(await authors.searchAuthorsByAge());
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge("Not a number."));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge(101));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge(-1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge(40));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge(5000));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge(" "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge("abc"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByAge());
} catch(e) {
    console.log(e);
}

//Authors getBooksByState

try {
    console.log(await authors.getBooksByState());
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState(0));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState("1"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState("123"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState(" "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState(""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState("QU"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState("NJ"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState(123));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState(" "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState("Patrick"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getBooksByState());
} catch(e) {
    console.log(e);
}

//Authors searchAuthorsByHometown

try {
    console.log(await authors.searchAuthorsByHometown());
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("hometown", ""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("", "state"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("",""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown(" ", "state"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("hometown", " "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown(" ", " "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("hometown", "1"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("hometown", "123"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("New York City", "NY"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("new york city", "NY"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("New York Cit", "NY"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("New York City", "NY"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown(123, 456));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("", ""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown("Patrick", "Hill"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.searchAuthorsByHometown());
} catch(e) {
    console.log(e);
}

//Authors getAuthorBooks

try {
    console.log(await authors.getAuthorBooks());
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks(1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks(""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks(" "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks("Not a valid ID."));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks("2155574a-80b0-4389-8bb3-3240da52b770"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks(""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks(230));
} catch(e) {
    console.log(e);
}

try {
    console.log(await authors.getAuthorBooks());
} catch(e) {
    console.log(e);
}

//Books getBookById

try {
    console.log(await books.getBookById());
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById(1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById(""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById(" "));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById(-1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.getBookById(1001));
} catch(e) {
    console.log(e);
}

//Books booksByPageCount

try {
    console.log(await books.booksByPageCount());
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(1, ""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount("", 1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(-1, 1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(1, -1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(-1, -1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(.5, 1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(1, .5));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(.5, .5));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(2, 1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(0, 0));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(300, 500));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount(-1, 100));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount("ABC", "3"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.booksByPageCount());
} catch(e) {
    console.log(e);
}

//Books sameYear

try {
    console.log(await books.sameYear());
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.sameYear('foo bar'));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.sameYear(-1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.sameYear(0.5));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.sameYear(1001));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.sameYear(2000));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.sameYear(false));
} catch(e) {
    console.log(e);
}

//Books minMaxPrice()

try {
    console.log(await books.minMaxPrice());
} catch(e) {
    console.log(e);
}

//Books searchBooksByPublisher

try {
    console.log(await books.searchBooksByPublisher());
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.searchBooksByPublisher(1));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.searchBooksByPublisher("Not a publisher"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.searchBooksByPublisher("Skilith"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.searchBooksByPublisher("skilith"));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.searchBooksByPublisher(""));
} catch(e) {
    console.log(e);
}

try {
    console.log(await books.searchBooksByPublisher(" "));
} catch(e) {
    console.log(e);
}