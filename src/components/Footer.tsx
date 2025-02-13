const Footer = () => {
    return (<footer className="bg-gray-800 text-gray-400 py-4">
    <p className="text-center">
      © {new Date().getFullYear()} News Aggregator. All rights reserved.
    </p>
  </footer>);
}

export default Footer;