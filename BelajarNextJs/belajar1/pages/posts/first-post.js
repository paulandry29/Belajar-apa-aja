import Link from 'next/link';

export default function FirstPost() {
    return (
      <>
        <h1>First Post</h1>
        <h4>
          <Link href="/">Back to home</Link>
        </h4>
      </>
    );
  }