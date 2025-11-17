type MDXLinkProps = {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLAnchorElement>;
  href: string;
};

export const MDXLink = (props: MDXLinkProps) => (
  <a
    target="_blank"
    {...props}
    className="font-semibold text-black no-underline transition-colors duration-300 after:ml-[0.1rem] after:text-[90%] after:content-['↗'] hover:text-skyblue"
  />
);
