import { Modal, Button } from "react-bootstrap";

export const WebViewModal = ({ show, setShow, url }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="example-custom-modal-styling-title"
      size="xl"
      contentClassName="h-100"
    >
      <div
        style={{ width: "100%", height: 800 }}
        dangerouslySetInnerHTML={{
          __html: `<iframe
            src=${url}
            width="100%"
            height="100%"
          ></iframe>`,
        }}
      ></div>
    </Modal>
  );
};
