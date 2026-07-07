# Troubleshooting:  — "Port XXXXX is in use" 

`sudo ss -tulnp | grep <PORT>` — shows which process is listening on the port (PID, name).

`ps -ef | grep <PID>` — shows the full command line for that PID, so you can confirm which instance it actually belongs to before touching it.

`ps -p <PID>` — checks if a PID is still alive (useful to confirm before/after killing).

`kill <PID>` — gracefully stops the process (SIGTERM).

`kill -9 <PID>` — force-kills the process if it doesn't respond to SIGTERM.
