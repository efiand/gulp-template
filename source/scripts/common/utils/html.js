// Функция для пометок шаблонных строк, в которых нужна поддержка HTML со стороны VS Code

export default (raw, ...values) => String.raw({ raw }, ...values);
