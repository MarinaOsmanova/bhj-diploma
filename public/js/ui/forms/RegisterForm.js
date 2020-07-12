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
        if (response.success) {
          App.getForm('register').reset();
          App.setState('user-logged');
        }
        const modalId = this.closest('.modal').dataset['modalId'];
        const modal = App.getModal(modalId);
        if (modal) {
          modal.close();
        }
      }
    );
  }
}
