ARG BUILD_FROM
FROM $BUILD_FROM

# Install Node.js
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy application files
COPY rootfs /

# Make run script executable
RUN chmod a+x /run.sh

# Expose port
EXPOSE 8000

# Start script
CMD [ "/run.sh" ]