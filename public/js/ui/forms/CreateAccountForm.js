/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(
      this.getData(),
      function(err, response) {
        if (response && response.success) {
          App.getModal('createAccount').close();
          App.getForm('createAccount').element.reset();
          App.update();
        } else if (err) {
          alert(err);
        }
      }
    );
  }
}
