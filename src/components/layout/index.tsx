import Header from '@/components/layout/Header';
import MainContent from '@/components/layout/MainContent';
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="SignFlow" />
      <MainContent />
    </div>
  );
}
