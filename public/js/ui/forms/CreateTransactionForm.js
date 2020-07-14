/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsList = this.element.querySelector('.accounts-select');
    Account.list(
      null,
      function(err, response) {
        if (err || !response || !response.data) {
          return;
        }
        const data = response.data;
        let optionsHTML = '';
        for (let i=0; i<data.length; i++) {
          optionsHTML += `<option value="${data[i].id}">${data[i].name}</option>`;
        }
        accountsList.innerHTML = optionsHTML;
      }
    );
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    const currentForm = this.element;
    Transaction.create(
      this.getData(),
      function(err, response) {
        if (response && response.success) {
          const transactionType = currentForm.querySelector('input[name="type"]').value;
          const modalId = 'new' + transactionType.charAt(0).toUpperCase() + transactionType.slice(1);
          App.getModal(modalId).close();
          currentForm.reset();
          App.update();
        }
      }
    );
  }
}
