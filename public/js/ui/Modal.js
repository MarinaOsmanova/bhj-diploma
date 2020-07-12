/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw 'Modal: Пустой element';
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    Array.from(this.element.querySelectorAll('[data-dismiss="modal"]')).forEach(dismissElement => {
      dismissElement.addEventListener('click', this.onClose);
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    const modalId = this.closest('.modal').dataset['modalId'];
    const modal = App.getModal(modalId);
    if (modal) {
      modal.close();
    }
    return false;
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    Array.from(this.element.querySelectorAll('[data-dismiss]="modal"')).forEach(dismissElement => {
      dismissElement.removeEventListener('click', this.onClose);
    });
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = null;
  }
}
