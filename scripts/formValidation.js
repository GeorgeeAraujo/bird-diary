function validateLoginForm(){ /*Função que realiza a habilitação do botão de login a partir da validação do email e senha*/
    if(validatePassword(loginForm.password(), loginForm.obrigatoryPassword(), loginForm.invalidPassword()) & validateEmail(loginForm.email(), loginForm.obrigatoryEmail(), loginForm.invalidEmail())){
        loginForm.loginButton().removeAttribute("disabled");
    } else {
        loginForm.loginButton().setAttribute("disabled","disabled");
    };
};

function validateNewUserForm(){ /* Função que faz a ativação do botão de registrar caso o formulário esteja válido. */
    if (validateEmail(newUserForm.email(), newUserForm.requiredEmailError(), newUserForm.invalidEmailError()) & validatePassword(newUserForm.password(), newUserForm.requiredPasswordError(), newUserForm.invalidPasswordError()) & passwordsMatch()) {
        newUserForm.createAccountBtn().removeAttribute("disabled");
    } else {
        newUserForm.createAccountBtn().setAttribute("disabled", "disabled");
    };    
};

/* -------------------------------------------------------------------------------------------------------------------- */

/* Início das funções da validação do EMAIL */

function validateEmail(email, obrigatoryError, invalidError){ /* Validação do email */
    toggleEmailError(email, obrigatoryError, invalidError);
    if(!isFieldEmpty(email) && isEmailValidy(email)){
        return true;
    } else{
        return false;
    }
};

function toggleEmailError(email, obrigatoryError, invalidError){ /* Alterna na tela os possíveis erros contidos no email fornecido pelo usuário */
    if(isFieldEmpty(email)){
        showError(obrigatoryError);
    } else if (!isFieldEmpty(email)){
        hideError(obrigatoryError);
    };
    if(!isEmailValidy(email)){
        showError(invalidError);
    } else if(isEmailValidy(email)){
        hideError(invalidError);
    };
};

function isEmailValidy(email){ /* Verifica se o email possui uma estrutura de email, a partir de uma RegEx. */
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
};

/* Fim das funções da validação do email */

/* -------------------------------------------------------------------------------------------------------------------- */

/* Início das funções da validação da SENHA */

function validatePassword(password, obrigatoryError, invalidError){ /* Validação da senha */
    togglePasswordError(password, obrigatoryError, invalidError);
    if(!isFieldEmpty(password) && isPasswordValidy(password)){
        return true;
    } else{
        return false;
    }
};

function togglePasswordError(password, obrigatoryError, invalidError){ /* Alterna na tela os possíveis erros contidos na senha fornecida pelo usuário */
    if(isFieldEmpty(password)){
        showError(obrigatoryError);
    } else if (!isFieldEmpty(password)){
        hideError(obrigatoryError);
    };
    if(!isPasswordValidy(password)){
        showError(invalidError);
    } else if(isPasswordValidy(password)){
        hideError(invalidError);
    };
};

function isPasswordValidy(password){ /* Verifica se a senha possui no minímo 6 caracteres. */
    return password.length >= 6;
};

function passwordsMatch(){ /* Verifica se as senhas do campo 'Password' e 'Confirm password' são de fato iguais. Se não forem, mostra uma mensagem de erro para o usuário. */
    if(newUserForm.password() == newUserForm.confirmPassword()){
        hideError(newUserForm.passwordsDontMatchError());
        return true;
    } else {
        showError(newUserForm.passwordsDontMatchError());
        return false;
    };
};

/* Fim das funções da validação da SENHA */

/* -------------------------------------------------------------------------------------------------------------------- */

/* Início das funções de ERROS. */

function isFieldEmpty(field){ /* Verifica se o campo está vazio. */
    return field == '';
};

function showError(error){ /* Mostra a mensagem de erro na tela do usuário. */
    error.style.display = "block";
};

function hideError(error){ /* Esconde a mensagem de erro da tela do usuário. */
    error.style.display = "none";
};

function getErrorMessage(error){ /* Mostra mensagens de erros personalizadas no momento do login e criação de novo usuário. */
    if(error == 'auth/user-not-found'){
        return 'User not found!';
    } else if(error == 'auth/wrong-password'){
        return 'The password is wrong!';
    } else if (error == 'auth/email-already-in-use'){
        return 'The email is already in use! Try I forgot my password.';
    } else {
        return error;
    };
};

/* Fim das funções de ERROS. */





