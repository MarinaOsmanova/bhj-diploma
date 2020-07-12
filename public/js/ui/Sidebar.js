/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector('.sidebar-toggle').onclick = function() {
      const classList = document.querySelector('body').classList;
      classList.toggle('sidebar-open');
      classList.toggle('sidebar-collapse');
      return false;
    };
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sideBarMenu = document.querySelector('.sidebar-menu');
    sideBarMenu.querySelector('.menu-item_register a').onclick = function() {
      App.getModal('register').open();
      return false;
    }

    sideBarMenu.querySelector('.menu-item_login a').onclick = function() {
      App.getModal('login').open();
      return false;
    }

    sideBarMenu.querySelector('.menu-item_logout a').onclick = function() {
      User.logout(
        null,
        function(err, response) {
          if (response && response.success) {
            App.setState('init');
          }
        }
      );
      return false;
    }
  }

}
