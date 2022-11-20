export const checkModPressed = (evt) => evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey;

export const html = (raw, ...values) => String.raw({ raw }, ...values);
