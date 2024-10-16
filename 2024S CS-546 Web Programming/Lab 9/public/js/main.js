//Here is where you will do all of the logic and processing for the palindrome and prime checking.
const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var str = document.getElementById('palindrome_input').value;
    var error = document.getElementById("error");
    if ((!str || str.trim().length === 0) && !error) {
        error = document.createElement('p');
        error.className = "error";
        error.innerHTML = "An error has occurred.";
        error.id = "error";
        document.getElementById('myForm').appendChild(error);
    } else {
        str = str.trim();
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var nums = '1234567890';
        var strings = [];
        var currStr = "";
        for (i = 0; i < str.length; ++i) {
            if (str[i] === ',' || i === str.length - 1) {
                if (chars.includes(str[i].toLowerCase()) || nums.includes(str[i].toLowerCase())) {
                    currStr += str[i];
                }
                strings.push(currStr);
                currStr = "";
            }
            else if (chars.includes(str[i].toLowerCase()) || nums.includes(str[i].toLowerCase())) {
                currStr += str[i].toLowerCase();
            } 
            else {
                continue;
            } 
        }
        var reverseStrings = [];
        reverseStr = "";
        for (let i in strings) {
            for (j = strings[i].length - 1; j >= 0; --j) {
                reverseStr += strings[i][j];
            }
            reverseStrings.push(reverseStr);
            reverseStr = "";
        }
        var bools = [];
        for (let i = 0; i < strings.length; ++i) {
            if (strings[i] === reverseStrings[i]) {
                bools.push(true);
            }
            else bools.push(false);
        }
        if (bools.length > 0) {
            var li = document.createElement('li');
            li.innerHTML = "[" + bools + "]";
            var prime = true;
            if (bools.length > 1) {
                for (let i = 2; i < bools.length; ++i) {
                    if (bools.length % i === 0) {
                        prime = false;
                        break;
                    }
                }
            }
            if (prime) li.className = "prime";
            else li.className = "not-prime"
            var list = document.getElementById('palindromes');
            if (error) {
                error.remove();
            }
            list.appendChild(li);
        }
    }
});
