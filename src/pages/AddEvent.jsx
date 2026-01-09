import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPage from '../components/Molecules/FormPage';
import TextInput from '../components/Atoms/TextInput';
import SelectInput from '../components/Atoms/SelectInput';
import PrimaryButton from '../components/Atoms/PrimaryButton';
import { showError, showSuccess } from '../utils/toast';
import api from '../api/axios';

export default function CreateEvent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    invited_user_id: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data?.result?.users || []);
      } catch (err) {
        console.log('Error fetching users:', err);
        showError('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!formData.title.trim()) {
      showError('Title is required');
      return false;
    }

    if (!formData.event_date) {
      showError('Event date & time is required');
      return false;
    }

    if (!formData.invited_user_id) {
      showError('Please select a user to invite');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await api.post('/events', {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        event_date: new Date(formData.event_date).toISOString(),
        invited_user_id: formData.invited_user_id
      });

      showSuccess('Event created successfully');
      navigate('/');
    } catch (err) {
      showError(
        err?.response?.data?.message || 'Failed to create event'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPage>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Create Event</h2>

        <TextInput
          label="Title *"
          value={formData.title}
          onChange={(v) => handleChange('title', v)}
          placeholder="Event title"
        />

        <TextInput
          label="Description"
          value={formData.description}
          onChange={(v) => handleChange('description', v)}
          placeholder="Event description"
        />

        <TextInput
          label="Location"
          value={formData.location}
          onChange={(v) => handleChange('location', v)}
          placeholder="Meeting location"
        />

        <TextInput
          label="Event Date & Time *"
          type="datetime-local"
          value={formData.event_date}
          onChange={(v) => handleChange('event_date', v)}
        />

        <SelectInput
          label="Invite User *"
          value={formData.invited_user_id}
          onChange={(v) => handleChange('invited_user_id', v)}
          options={users.map(user => ({
            label: `${user.name} (${user.email})`,
            value: user.id
          }))}
          placeholder="Select user"
        />

        <PrimaryButton
          type="submit"
          disabled={loading}
          name={loading ? 'Creating...' : 'Create Event'}
        />
      </form>
    </FormPage>
  );
}

const styles = {
  form: {
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 10,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
  }
};
