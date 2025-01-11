# Set Env
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"

# Format log Dir
bin/kafka-storage.sh format --standalone -t $KAFKA_CLUSTER_ID -c config/kraft/reconfig-server.properties

# Start Server
bin/kafka-server-start.sh config/kraft/reconfig-server.properties

# With Docker
docker run -p 9092:9092 --name broker -d apache/kafka:3.9.0  

docker exec --workdir /opt/kafka -it broker sh

# Create Topic
bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092

# Describe Topic
bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092

# List Topics
bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

# Produce Event in topic
bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092

# Consume events from topic
bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092

# Terminate all of kafka
rm -rf /tmp/kafka-logs /tmp/zookeeper /tmp/kraft-combined-logs

# Docker
 docker run -d  \
  --name broker1 \
  -e KAFKA_NODE_ID=1 \
  -e KAFKA_PROCESS_ROLES=broker,controller \
  -e KAFKA_LISTENERS=PLAINTEXT://:9093,CONTROLLER://:9094 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9093 \
  -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
  -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9094 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  -e KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 \
  -e KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1 \
  -e KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS=0 \
  -e KAFKA_NUM_PARTITIONS=3 \
 -p 9093:9093  apache/kafka:latest

