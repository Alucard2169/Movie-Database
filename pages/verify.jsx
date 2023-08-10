import verifyStyle from '@/styles/Verify.module.css';
import { useUser } from '@supabase/auth-helpers-react';
import { MdEmail } from 'react-icons/md';

const Verify = () => {
    const user = useUser()
    return (
      <div className={verifyStyle.page}>
            <div className={verifyStyle.card}>
                <p>We{`&apos`}ve sent you a confirmation link to your email</p>
          <p>
            Please verify
                </p>
                <MdEmail className={verifyStyle.icon} />
        </div>
      </div>
    );
}
 
export default Verify;