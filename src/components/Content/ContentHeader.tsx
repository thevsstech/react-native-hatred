export type ContentHeaderCallbackParams = {
  onDismiss: () => void;
};

export type ContentHeaderCallback = (
  params: ContentHeaderCallbackParams
) => JSX.Element;

const ContentHeader = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | ContentHeaderCallback;
}) => {
  return children;
};

ContentHeader.displayName = 'Content.Header';

export default ContentHeader;
