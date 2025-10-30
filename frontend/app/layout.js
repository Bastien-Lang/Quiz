export const metadata = {
  title: "Quiz Game",
  description: "Quiz style Kahoot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "sans-serif", padding: "2rem" }}>
        {children}
      </body>
    </html>
  );
}
