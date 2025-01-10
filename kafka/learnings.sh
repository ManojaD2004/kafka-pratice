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

