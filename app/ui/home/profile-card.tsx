import styles from "./profile-card.module.scss"
import { montserrat } from '@/app/ui/fonts';

export default function ProfileCard( {
    children,
    className,
  }: Readonly<{
    children?: React.ReactNode;
    className?: string;
  }>) {
    return(
        <div className={`
            ${styles.card} 
            ${montserrat.className} 
            ${className}
        `}>
            {children}
        </div>
    );
}