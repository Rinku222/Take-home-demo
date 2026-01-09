import { useEffect, useState, memo, useCallback } from 'react';
import api from '../../api/axios';
import { showError, showSuccess } from '../../utils/toast';
import { useAuth } from '../../hooks/useAuth';
import ConfirmationModal from '../Modal/ConfirmationModal';

const EventCard = memo(({ event, onDelete, canDelete }) => {
  return (
    <div style={styles.card}>
      <div>
        <p><b>{event.title}</b></p>
        <p>{event.description}</p>
        <p>{event.location}</p>
        <p style={styles.date}>
          {new Date(event.event_date).toLocaleString()}
        </p>
      </div>

      {canDelete && (
        <button
          onClick={() => onDelete(event)}
          style={styles.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
});

function EventList() {
  const { isAuthenticated } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');

        console.log("fetched events data",data);
        if (mounted) {
          setEvents(data?.result?.data || []);
        }
      } catch (err) {
        showError(err?.response?.data?.message || 'Failed to fetch events');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDeleteClick = useCallback((event) => {
    setSelectedEvent(event);
    setShowConfirm(true);
  }, []);

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;

    setDeleting(true);

    const prevEvents = events;

    setEvents((prev) =>
      prev.filter((e) => e.id !== selectedEvent.id)
    );

    try {
      await api.delete(`/events/${selectedEvent.id}`);

      showSuccess('Event deleted successfully');
      setShowConfirm(false);
      setSelectedEvent(null);
    } catch (err) {
      setEvents(prevEvents);
      showError(err?.response?.data?.message || 'Failed to delete event');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <p>Loading events...</p>
      </div>
    );
  }
  console.log("events",events)

  return (
    <div style={styles.container}>
      
      {events.length === 0 && (
        <p style={styles.empty}>No events found</p>
      )}

      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          canDelete={isAuthenticated}
          onDelete={handleDeleteClick}
        />
      ))}

      <ConfirmationModal
        open={showConfirm}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.title}"?`}
        confirmText={deleting ? 'Deleting...' : 'Yes, Delete'}
        cancelText="No"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        disableConfirm={deleting}
      />
    </div>
  );
}

export default memo(EventList);

const styles = {
  container: {
    padding: 20,
    overflowY: 'auto',
    flex: 1
  },
  card: {
    padding: 12,
    border: '1px solid #ddd',
    borderRadius: 6,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer'
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    fontSize: 12,
    color: '#666'
  },
  empty: {
    textAlign: 'center',
    color: '#777'
  }
};
