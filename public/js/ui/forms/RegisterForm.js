/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(
      this.getData(),
      function(err, response) {
        if (response && response.success) {
          App.getForm('register').element.reset();
          App.getModal('register').close();
          App.setState('user-logged');
        } else if (err) {
          alert(JSON.stringify(err));
        }
      }
    );
  }
}
