type Props = {
  children: JSX.Element;
};

export default function ContentEmpty({ children }: Props) {
  return children;
}

ContentEmpty.displayName = 'Content.Empty';
