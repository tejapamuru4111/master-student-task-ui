function calculation(input) {
      
    function one(fun="") {
        return 1+fun
    }
      
    function two(fun="") {
        return 2+fun
    }

    function three(fun="") {
        return 3+fun
    }
      
    function four(fun="") {
        return 4+fun
    }

    function five(fun="") {
        return 5+fun
    }
      
    function six(fun="") {
        return 6+fun
    }

    function seven(fun="") {
        return 7+fun
    }
      
    function eight(fun="") {
        return 8+fun
    }

    function nine(fun="") {
        return 9+fun
    }
      
    function zero(fun="") {
        return 0+fun
    }

    function plus(fun="") {
        return "+"+fun
    }

    function minus(fun="") {
        return "-"+fun
    }

    function times(fun="") {
        return "*"+fun
     }
      
    function divided_by(fun="") {
        return "/"+fun
    }
      
      
    let exp = eval(input);
    
    switch (exp[1]) {
        case '+':
            return (parseInt(exp[0]) + parseInt(exp[2]));
        case '-':
            return (parseInt(exp[0]) - parseInt(exp[2]));
        case '*':
            return (parseInt(exp[0]) * parseInt(exp[2]));
        case '/':
            return (Math.floor(parseInt(exp[0]) / parseInt(exp[2])));
    }
    return 0
}

export default calculation