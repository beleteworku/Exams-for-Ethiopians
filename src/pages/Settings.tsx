import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Lock, Bell, Upload, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsSection = 'profile' | 'security' | 'notifications';

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Profile data
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    // @ts-ignore - Type will be auto-generated
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, username, bio, avatar_url')
      .eq('user_id', user.id)
      .single();

    if (data && !error) {
      // @ts-ignore - Type will be auto-generated
      setFullName(data.full_name || '');
      // @ts-ignore - Type will be auto-generated
      setUsername(data.username || '');
      // @ts-ignore - Type will be auto-generated
      setBio(data.bio || '');
      // @ts-ignore - Type will be auto-generated
      setAvatarUrl(data.avatar_url || '');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image under 1MB.',
          variant: 'destructive',
        });
        return;
      }
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user) return;
    
    setUploading(true);
    try {
      if (avatarUrl) {
        const path = avatarUrl.split('/').pop();
        if (path) {
          await supabase.storage.from('avatars').remove([`${user.id}/${path}`]);
        }
      }

      // @ts-ignore - Type will be auto-generated
      await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('user_id', user.id);

      setAvatarUrl('');
      setPreviewUrl('');
      setAvatarFile(null);
      
      toast({
        title: 'Avatar removed',
        description: 'Your profile picture has been removed.',
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove avatar.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const uploadAvatar = async () => {
    if (!user || !avatarFile) return null;

    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let newAvatarUrl = avatarUrl;

      if (avatarFile) {
        setUploading(true);
        newAvatarUrl = await uploadAvatar() || avatarUrl;
        setUploading(false);
      }

      const updateData: any = {
        full_name: fullName,
        username: username || null,
        bio: bio || null,
        avatar_url: newAvatarUrl || null,
      };

      // @ts-ignore - Type will be auto-generated
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

      if (error) throw error;

      setAvatarUrl(newAvatarUrl);
      setPreviewUrl('');
      setAvatarFile(null);

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const sidebarItems = [
    { id: 'profile' as SettingsSection, label: 'Profile Information', icon: User },
    { id: 'security' as SettingsSection, label: 'Security & Password', icon: Lock },
    { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
  ];

  const displayAvatarUrl = previewUrl || avatarUrl;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          {/* Sidebar */}
          <aside className="py-6 lg:col-span-3">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      'w-full group rounded-lg px-3 py-2 flex items-center text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon
                      className={cn(
                        'mr-3 h-5 w-5 transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-6 lg:col-span-9">
            {activeSection === 'profile' && (
              <form onSubmit={handleSaveProfile}>
                <Card className="shadow-sm">
                  <div className="space-y-6 p-6">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Update your profile details and preferences.
                      </p>
                    </div>

                    {/* Avatar Upload */}
                    <div className="space-y-2">
                      <Label>Profile Photo</Label>
                      <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          {displayAvatarUrl ? (
                            <img
                              src={displayAvatarUrl}
                              alt="Avatar"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>

                        <Label
                          htmlFor="avatar-upload"
                          className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          Change Photo
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleAvatarChange}
                            disabled={uploading}
                          />
                        </Label>

                        {(avatarUrl || previewUrl) && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveAvatar}
                            disabled={uploading}
                            className="text-destructive hover:text-destructive"
                          >
                            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4 mr-1" />}
                            Remove
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        JPG, GIF, or PNG. Max 1MB.
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                          id="full-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ''}
                          className="mt-1"
                          disabled
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Email cannot be changed from this page.
                        </p>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="mt-1"
                          placeholder="my_username"
                        />
                      </div>

                      <div className="col-span-6">
                        <Label htmlFor="bio">About</Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={3}
                          className="mt-1"
                          placeholder="A brief bio about yourself."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="bg-muted/50 px-6 py-3 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading || uploading}>
                      {loading || uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </Card>
              </form>
            )}

            {activeSection === 'security' && (
              <Card className="shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Security & Password</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Manage your password and security settings.
                    </p>
                  </div>
                  <div className="text-center py-12 text-muted-foreground">
                    Password management coming soon.
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card className="shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Notification Preferences</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Configure how you receive notifications.
                    </p>
                  </div>
                  <div className="text-center py-12 text-muted-foreground">
                    Notification settings coming soon.
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
