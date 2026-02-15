const WaitingApproval = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold">Account Under Review ⏳</h2>
      <p className="mt-2">Your agent account is waiting for admin approval.</p>
      <p>Please wait until admin approves your account.</p>
    </div>
  );
};

export default WaitingApproval;
