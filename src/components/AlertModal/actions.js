export const ALERTMODAL_SET = 'ALERTMODAL_SET';

export const setAlertModal = (show, title, message, content) => ({
  type: ALERTMODAL_SET,
  payload: {
    show,
    title,
    message,
    content,
  },
});