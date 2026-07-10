const NOTIFICATION_TYPES = {
  QUEUE_UPDATE: 'queue_update',
  STATUS_CHANGE: 'status_change',
};

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: NOTIFICATION_TYPES.QUEUE_UPDATE,
    title: 'Queue position updated',
    message: 'You moved to position 3 in the General Consultation queue.',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: NOTIFICATION_TYPES.STATUS_CHANGE,
    title: 'Status changed',
    message: 'Your status is now: Almost ready. Please head to Counter 2.',
    timestamp: '8 min ago',
    read: false,
  },
  {
    id: '3',
    type: NOTIFICATION_TYPES.QUEUE_UPDATE,
    title: 'Joined queue',
    message: 'You joined the Lab Services queue. Estimated wait: 15 minutes.',
    timestamp: '25 min ago',
    read: true,
  },
  {
    id: '4',
    type: NOTIFICATION_TYPES.STATUS_CHANGE,
    title: 'Service complete',
    message: 'Your previous visit to Pharmacy Pickup was marked as served.',
    timestamp: '1 day ago',
    read: true,
  },
];

let notifications = [...MOCK_NOTIFICATIONS];

function getUnreadCount() {
  return notifications.filter((n) => !n.read).length;
}

function getTypeLabel(type) {
  return type === NOTIFICATION_TYPES.QUEUE_UPDATE ? 'Queue update' : 'Status change';
}

function markAsRead(id) {
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
}

function markAllAsRead() {
  notifications = notifications.map((n) => ({ ...n, read: true }));
}

function renderNotificationItem(notification) {
  const article = document.createElement('article');
  article.className = `notification-item${notification.read ? ' notification-item--read' : ''}`;
  article.dataset.id = notification.id;

  article.innerHTML = `
    <div class="notification-item__header">
      <span class="notification-item__type">${getTypeLabel(notification.type)}</span>
      <time class="notification-item__time">${notification.timestamp}</time>
    </div>
    <h4 class="notification-item__title">${notification.title}</h4>
    <p class="notification-item__message">${notification.message}</p>
  `;

  if (!notification.read) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'notification-item__action';
    button.textContent = 'Mark as read';
    button.addEventListener('click', () => {
      markAsRead(notification.id);
      updateNotificationUI();
    });
    article.appendChild(button);
  }

  return article;
}

function updateNotificationUI() {
  const badge = document.getElementById('notification-badge');
  const markAllButton = document.getElementById('mark-all-read');
  const list = document.getElementById('notification-list');
  const toggle = document.getElementById('notification-toggle');

  const unreadCount = getUnreadCount();

  if (unreadCount > 0) {
    badge.hidden = false;
    badge.textContent = unreadCount;
    markAllButton.hidden = false;
    toggle.setAttribute('aria-label', `Notifications, ${unreadCount} unread`);
  } else {
    badge.hidden = true;
    markAllButton.hidden = true;
    toggle.setAttribute('aria-label', 'Notifications');
  }

  list.innerHTML = '';

  if (notifications.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'notification-panel__empty';
    empty.textContent = 'No notifications yet.';
    list.appendChild(empty);
    return;
  }

  notifications.forEach((notification) => {
    list.appendChild(renderNotificationItem(notification));
  });
}

function initNotifications() {
  const bell = document.getElementById('notification-bell');
  const panel = document.getElementById('notification-panel');
  const toggle = document.getElementById('notification-toggle');
  const markAllButton = document.getElementById('mark-all-read');

  if (!bell) return;

  updateNotificationUI();

  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  markAllButton.addEventListener('click', () => {
    markAllAsRead();
    updateNotificationUI();
  });

  document.addEventListener('mousedown', (e) => {
    if (!bell.contains(e.target)) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
