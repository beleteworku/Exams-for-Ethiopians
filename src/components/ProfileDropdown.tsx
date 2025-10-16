import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const ProfileDropdown = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        // @ts-ignore - Type will be auto-generated
        const { data } = await supabase
          // @ts-ignore - Type will be auto-generated
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('user_id', user.id)
          .single();

        if (data) {
          // @ts-ignore - Type will be auto-generated
          setFullName(data.full_name || '');
          // @ts-ignore - Type will be auto-generated
          setAvatarUrl(data.avatar_url || '');
        }
      }
    };

    fetchProfile();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "flex items-center gap-2 rounded-full transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "hover:ring-2 hover:ring-primary/50"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName || 'User'}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              {initials || <User className="h-5 w-5" />}
            </span>
          )}
        </div>

        {/* Chevron indicator */}
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute right-0 z-50 mt-2 w-56 origin-top-right",
            "rounded-lg bg-popover shadow-lg ring-1 ring-border",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info Section */}
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-popover-foreground truncate">
              {fullName || 'User'}
            </p>
            <p className="truncate text-xs text-muted-foreground mt-1">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => handleNavigation('/settings')}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2 text-sm",
                "text-popover-foreground transition-colors",
                "hover:bg-dropdown-hover hover:text-dropdown-hover-text"
              )}
              role="menuitem"
            >
              <Settings className="h-4 w-4" />
              {t('settings')}
            </button>
          </div>

          {/* Logout Section */}
          <div className="border-t border-border py-1">
            <button
              onClick={handleSignOut}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2 text-sm",
                "text-destructive transition-colors",
                "hover:bg-destructive/10"
              )}
              role="menuitem"
            >
              <LogOut className="h-4 w-4" />
              {t('logOut')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
